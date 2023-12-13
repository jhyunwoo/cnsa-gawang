import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useVoters() {
  const { data, error, isLoading, mutate } = useSWR<
    {
      created: Date;
      email: string | null;
      emailVerified: Date | null;
      id: string;
      image: string | null;
      name: string | null;
      role: "ADMIN" | "USER" | "BANNED";
      studentId: number | null;
    }[]
  >(`/api/voters`, fetcher);
  return {
    voters: data,
    votersLoading: isLoading,
    votersError: error,
    votersMutate: mutate,
  };
}
