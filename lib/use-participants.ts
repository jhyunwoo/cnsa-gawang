import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useParticipants() {
  const { data, error, isLoading, mutate } = useSWR<
    {
      id: string;
      name: string;
      description: string;
      contestId: string;
    }[]
  >(`/api/participants`, fetcher);
  return {
    participants: data,
    participantsLoading: isLoading,
    participantsError: error,
    participantsMutate: mutate,
  };
}
