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
}

export {
  getPutHeader
}