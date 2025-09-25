import fs from "fs";

const rawData = fs.readFileSync("./raw_ai33.json", "utf-8");
const items = JSON.parse(rawData);

const filter_items = items.map((item) => {
  const id = item?.voice_info?.voice_id;
  const avatar = item?.voice_info?.cover_url;
  const title = item?.voice_info?.voice_name;
  const sample_audio = item?.voice_info?.sample_audio;
  const tag_list = item?.voice_info?.tag_list || [];
  const language = tag_list[0] || "none";

  return {
    id,
    title,
    avatar,
    key: id,
    language,
    tags: tag_list,
    provider: "minimax",
    sample_audio,
  };
});

const unique_filter_items = filter_items.reduce((acc, cur) => {
  if (!acc.find((item) => item.key === cur.key)) {
    acc.push(cur);
  }
  return acc;
}, []);

fs.writeFileSync(
  "output_minimax_voices.json",
  JSON.stringify(unique_filter_items, null, 2),
  "utf-8"
);
