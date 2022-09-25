export const uploadPostImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_HTTP_HOST}/upload/post-image`,
    { method: "POST", body: formData }
  );
  const text = await res.text();
  if (res.status === 200) {
    return text;
  }
  else {
    throw text;
  }
}

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_HTTP_HOST}/upload/profile-picture`,
    { method: "POST", body: formData }
  );
  const text = await res.text();
  if (res.status === 200) {
    return text;
  } else {
    throw text;
  }
};
