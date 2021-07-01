const getMetaValue = (name) => {
  const element = document.head.querySelector(`meta[name="${name}"]`)
  return element.getAttribute("content") 
};

const getPutHeader = () => {
  return { "X-CSRF-Token": getMetaValue("csrf-token"),
            "Content-Type": "application/json",
            "Accept": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
            }
};

const sortArrayBy = (array, field_name, direction = 1) => {
  return (array.sort( 
    (a,b) => (a[field_name] > b[field_name]) ? 
      1*direction : 
        ((b[field_name] > a[field_name]) ? -1*direction : 0)))
};

export {
  getPutHeader,
  sortArrayBy,
}