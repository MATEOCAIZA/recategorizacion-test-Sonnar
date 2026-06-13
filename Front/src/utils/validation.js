/**
 * Valida si un DOI es correcto.
 * @param {string} doi - El DOI a validar.
 * @returns {boolean} - Retorna true si el DOI es válido, de lo contrario false.
 */
const validarDOI = (doi) => {
    const regex = /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
    return regex.test(doi);
  };
  
  /**
   * Valida si un ISSN o e-ISSN es correcto.
   * @param {string} issn - El ISSN o e-ISSN a validar.
   * @returns {boolean} - Retorna true si el ISSN es válido, de lo contrario false.
   */
  const validarISSN = (issn) => {
    const regex = /^\d{4}-\d{3}[\dX]$/i;
    return regex.test(issn);
  };
  
  export { validarDOI, validarISSN };