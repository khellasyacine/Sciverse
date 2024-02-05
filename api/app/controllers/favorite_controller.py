from flask import Flask, request, jsonify
from flask_jwt_extended import current_user, get_jwt_identity
from flask_login import login_manager, LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_jwt_extended import jwt_required, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import ForeignKey
from app.models import *


@jwt_required()
def add_to_favorites(article_id):
    current_user_id = get_jwt_identity()

    # Check if the article exists
    article = Article.query.get(article_id)
    if not article:
        return jsonify({'error': 'Article not found'}), 404

    # Check if the article is not already in favorites
    if not FavoriteArticle.query.filter_by(user_id=current_user_id, article_id=article_id).first():
        fav_article = FavoriteArticle(user_id=current_user_id, article_id=article_id)
        db.session.add(fav_article)
        db.session.commit()

        return jsonify({'message': 'Article added to favorites successfully'}), 201
    else:
        return jsonify({'message': 'Article is already in favorites'}), 200



@jwt_required()
def remove_from_favorites(article_id):
    current_user_id = get_jwt_identity()
    fav_article = FavoriteArticle.query.filter_by(user_id=current_user_id, article_id=article_id).first()

    if fav_article:
        db.session.delete(fav_article)
        db.session.commit()

    return jsonify({'message': 'Article removed from favorites successfully'})


@jwt_required()
def get_favorite_articles():
    try:
        user_id = get_jwt_identity() 
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404

        favorite_articles = user.favorite_articles

        response_articles = []
        for article in favorite_articles:
            response_article = {
                'id': article.id,
                'title': article.title,
                'abstract': article.abstract,
                'full_text': article.full_text,
                'pdf_url': article.pdf_url,
                'is_favorite': True,
                'authors': [],
                'keywords': [],
                'references': [],
                'date': article.date.isoformat()
            }

            # Add keywords if available
            if hasattr(article, 'keywords'):
                if article.keywords and isinstance(article.keywords[0], Keyword):
                    # Extract keyword strings from Keyword model instances
                    response_article['keywords'] = [keyword.keyword for keyword in article.keywords]
                else:
                    # Keywords are already stored as strings
                    response_article['keywords'] = article.keywords

            # Add references if available
            if hasattr(article, 'references'):
                if article.references and isinstance(article.references[0], BibliographicReference):
                    # Extract keyword strings from Keyword model instances
                    response_article['references'] = [reference.reference for reference in article.references]
                else:
                    # Keywords are already stored as strings
                    response_article['references'] = article.references

            if article.authors :
                for author in article.authors:
                    author_data = {
                        'id': author.id,
                        'name': author.name,
                        'email': author.email,
                        'institutions': [{'institution_name': institution.institution_name} for institution in author.institutions]
                    }
                    response_article['authors'].append(author_data)


            # Add authors and references as before

            response_articles.append(response_article)

        return jsonify({'favorite_articles': response_articles}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500




