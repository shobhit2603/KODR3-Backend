import { createSong } from "../service/song.api";

export const useSong = () => {
  async function handleCreateSong({ songFile }) {
    const data = await createSong({ songFile });
    return data;
  }

  return {
    handleCreateSong,
  };
};
