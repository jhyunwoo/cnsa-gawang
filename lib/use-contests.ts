import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useContests() {
  const { data, error, isLoading, mutate } = useSWR<
    {
      id: string;
      participants: {
        contestId: string;
        participants: {
          contestId: string | null;
          description: string | null;
          id: string;
          name: string;
        };
        participantsId: string;
      }[];
      show: boolean;
    }[]
  >(`/api/contests`, fetcher);
  return {
    contests: data,
    contestsLoading: isLoading,
    contestsError: error,
    contestsMutate: mutate,
  };
}
