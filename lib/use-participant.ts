import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useParticipant(id: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    id: string;
    name: string;
    description: string | null;
    contestId: string | null;
  }>(`/api/participant?id=${id}`, fetcher);
  return {
    participant: data,
    participantLoading: isLoading,
    participantError: error,
    participantMutate: mutate,
  };
}
