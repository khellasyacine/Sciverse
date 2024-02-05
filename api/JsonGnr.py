from grobid_client_python.grobid_client.grobid_client import GrobidClient
import xml.etree.ElementTree as ET
import json
import os

from grobid_client_python.finale import parse_xml_to_json


# def create_directory_if_not_exists(directory):
#     # Obtenez le chemin absolu du répertoire en utilisant os.path.abspath
#     abs_directory = os.path.abspath(directory)
    
#     # Vérifiez si le répertoire existe
#     if not os.path.exists(abs_directory):
#         os.makedirs(abs_directory)
#         print(f"Le répertoire {abs_directory} a été créé avec succès.")
#     else:
#         print(f"Le répertoire {abs_directory} existe déjà.")

# # Exemple d'utilisation
# directory_path = "./tests/test_out"
# create_directory_if_not_exists(directory_path)





def JsonGenr(pdf_path,article_name):

    config_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'grobid_client_python'))
    config_path = os.path.join(config_dir, 'config.json')

    client = GrobidClient(config_path=config_path)
    client.process("processFulltextDocument", pdf_path, output="./tests/test_out", consolidate_citations=False, tei_coordinates=True, force=False)
    def parse_xml(xml_path):
        tree = ET.parse(xml_path)
        root = tree.getroot()
        return root

    def extract_authors(element):
        authors = []
        for author_element in element.findall('.//tei:author', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'}):
            name = author_element.findtext('tei:persName/tei:surname', '', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'})
            email = author_element.findtext('tei:email', '', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'})

            # Only include authors with both name and email
            if name and email:
                author_data = {
                    'name': name,
                    'email': email,
                    'institutions': []
                }

                for aff_element in author_element.findall('.//tei:affiliation', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'}):
                    institution_name = aff_element.findtext('tei:orgName[@type="department"]', '', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'})
                    author_data['institutions'].append({'institution_name': institution_name})

                authors.append(author_data)

        return authors

    def extract_keywords(element):
        return [term.text for term in element.findall('.//tei:term', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'})]

    def extract_references(element):
        return [ref.text for ref in element.findall('.//tei:listBibl/tei:biblStruct/tei:analytic/tei:title', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'})]

    def extract_full_text(element):
        return ' '.join(paragraph.text for paragraph in element.findall('.//tei:body/tei:div/tei:p', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'}))

    def extract_abstract(element):
        return ' '.join(paragraph.text for paragraph in element.findall('.//tei:abstract/tei:div/tei:p', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'}))

    def parse_xml_to_json(xml_path, json_path):
        root = parse_xml(xml_path)

        data = {
            'title': root.findtext('.//tei:titleStmt/tei:title[@type="main"]', '', namespaces={'tei': 'http://www.tei-c.org/ns/1.0'}),
            'abstract': extract_abstract(root),
            'authors': extract_authors(root),
            'keywords': extract_keywords(root),
            'references': extract_references(root),
            'full_text': extract_full_text(root),
        }

        with open(json_path, 'w') as json_file:
            json.dump(data, json_file, indent=2)
            return data
#______________ CHOFI HKD T'UTILISIHA ________________________
    # # Example usage:
    # xml_path = "./tests/test_out/test.grobid.tei.xml"
    # json_path = "./tests/test_out/Jsonfile.json"
    # print(parse_xml_to_json(xml_path, json_path))
    # return parse_xml_to_json(xml_path, json_path)

    # Example usage:
        

    xml_filename = f"{article_name}.grobid.tei.xml"
    xml_path = os.path.join("./tests/test_out", xml_filename)

    # xml_path = "./tests/test_out/article9.grobid.tei.xml"

    json_path = "./tests/test_out/Jsonfile.json"
    json_data = parse_xml_to_json(xml_path, json_path)
    
    article_name = f"{article_name}.pdf"
    pdf_path = os.path.join(pdf_path, article_name)

    # Remove the XML file
    # os.remove(xml_path)
    # os.remove(json_path)
    # os.remove(pdf_path)

    return json_data


# pdf_path = 'grobid_client_python/tests/test_pdf' 
# article_name = 'Article_10' # Update with relative path
# data = JsonGenr(pdf_path,article_name)
# print(data)


# def JsonGenr(pdf_path, article_name):
#     # Chemin vers le répertoire de sortie
#     output_dir = "api/tests/test_out"

#     # Créer le répertoire de sortie s'il n'existe pas déjà
#     if not os.path.exists(output_dir):
#         os.makedirs(output_dir)

#     config_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'grobid_client_python'))
#     config_path = os.path.join(config_dir, 'config.json')

#     client = GrobidClient(config_path=config_path)
#     client.process("processFulltextDocument", pdf_path, output=output_dir, consolidate_citations=False, tei_coordinates=True, force=False)

#     # Chemin vers le fichier XML généré
#     xml_filename = f"{article_name}.grobid.tei.xml"
#     xml_path = os.path.join(output_dir, xml_filename)

#     # Chemin vers le fichier JSON de sortie
#     json_filename = "Jsonfile.json"
#     json_path = os.path.join(output_dir, json_filename)

#     # Convertir le fichier XML en JSON
#     json_data = parse_xml_to_json(xml_path, json_path)

#     return json_data



# def JsonGenr(pdf_path, article_name):
#     config_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'grobid_client_python'))
#     config_path = os.path.join(config_dir, 'config.json')

#     # Corrected output directory path
#     output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'tests', 'test_out'))

#     client = GrobidClient(config_path=config_path)

#     # Corrected output parameter to be a directory path
#     client.process("processFulltextDocument", pdf_path, output=output_dir, consolidate_citations=False, tei_coordinates=True, force=False)

#     def parse_xml(xml_path):
#         tree = ET.parse(xml_path)
#         root = tree.getroot()
#         return root

#     # Rest of your code...

#     # Corrected XML and JSON paths
#     xml_filename = f"{article_name}.grobid.tei.xml"
#     xml_path = os.path.join(output_dir, xml_filename)
    
#     json_path = os.path.join(output_dir, "Jsonfile.json")
#     json_data = parse_xml_to_json(xml_path, json_path)

#     # Remove the XML file
#     # os.remove(xml_path)
#     # os.remove(json_path)

#     return json_data
