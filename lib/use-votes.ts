import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useVotes() {
  const { data, error, isLoading, mutate } = useSWR<
    {
      created: string;
      id: string;
      participants: {
        contestId: string;
        participants: {
          id: string;
          name: string;
          description: string | null;
          contestId: string | null;
        };
        participantsId: string;
      }[];
      show: boolean;
    }[]
  >(`/api/votes`, fetcher);
  return {
    votes: data,
    votesLoading: isLoading,
    votesError: error,
    votesMutate: mutate,
  };
}
