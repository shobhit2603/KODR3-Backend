export async function uploadSong(req, res) {
  console.log(req.file);
  res.send("Song uploaded successfully");
}
