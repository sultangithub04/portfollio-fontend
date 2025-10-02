export const getBlogById = async (blogid: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogid}`)
    return await res.json()
}