import axios from "axios";

// const API = "https://localhost:7181/api/post";

// export const getPosts = async () => {
//   const response = await axios.get(API);
//   return response.data;
// };
const API = "https://localhost:7181/api/post";

export async function getPosts() {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await res.json();
}

export async function getPostById(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
}
