export async function revalidatePage(path: string): Promise<boolean> {
  const url = `/api/revalidate?path=${path}`
  try {
    const res = await fetch(url);
    return res.status === 200;
  } catch (err) {
    console.log(`Failed to revalidate page ${path}!`);
    return false;
  }
}