const api = async () => {
  const request = await fetch('https:swapi-trybe.herokuapp.com/api/planets/');
  const response = await request.json();
  return response.results;
};

export default api;
