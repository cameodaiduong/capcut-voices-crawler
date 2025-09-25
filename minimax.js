import fs from "fs";

const rawData = fs.readFileSync("./raw_minimax.json", "utf-8");
const data = JSON.parse(rawData);

const language_tags = data?.data?.voice_tag_language || [];
const filter_tags = language_tags.map((tag) => {
  return {
    value: `${tag.tag_name}`.toLocaleLowerCase(),
    label: tag.tag_name,
    sample_text: tag.sample_text,
  };
});

fs.writeFileSync(
  "output_minimax_languages.json",
  JSON.stringify(filter_tags, null, 2),
  "utf-8"
);
