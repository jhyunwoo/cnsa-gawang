import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useContest(id: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    id: string;
    show: boolean;
    participants: {
      contestId: string;
      participants: {
        contestId: string | null;
        description: string | null;
        id: string;
        name: string;
      };
      participantsId: string;
      show: boolean;
    }[];
    votes: {
      contestId: string;
      created: Date;
      id: string;
      participantId: string;
      userId: string;
    }[];
  }>(`/api/contest?id=${id}`, fetcher);

  return {
    contest: data,
    contestLoading: isLoading,
    contestError: error,
    contestMutate: mutate,
  };
}
