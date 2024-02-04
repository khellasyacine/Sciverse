export const getAuteurInstitus = (auteur) => {
  let str = auteur.name + ": ";
  if (auteur.institutions) {
    str += auteur.institutions[0]?.institution_name;

    if (auteur.institutions.length > 2) {
      str += ", " + auteur.institutions[1]?.institution_name + " ...";
    } else if (auteur.institutions.length === 2)
      str += ", " + auteur.institutions[1]?.institution_name;
  }
  return str;
};

export const getSearchOptions = (filters) => {
  let searchOptions = { queries: [] };
  filters.map((filter) => {
    if (filter.checked && filter.value) {
      searchOptions.queries.push({ term: filter.value, field: filter.id });
    }
  });
  return searchOptions;
};