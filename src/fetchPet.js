const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  console.log(apiRes);

  if (!apiRes.ok) {
    throw new Error(`/details/${id} failed`);
  }

  return apiRes.json();
};

export default fetchPet;
