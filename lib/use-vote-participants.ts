import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useVoteParticipants(id: string) {
  const { data, error, isLoading, mutate } = useSWR<
    { id: string; name: string }[]
  >(`/api/vote?id=${id}`, fetcher);
  return {
    participants: data,
    participantsLoading: isLoading,
    participantsError: error,
    participantsMutate: mutate,
  };
}
