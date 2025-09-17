import fs from "fs";

const rawData = fs.readFileSync("./items.json", "utf-8");
const items = JSON.parse(rawData);

function detectCapcutLanguage(tagList) {
  if (!Array.isArray(tagList)) return "none";

  for (const tag of tagList) {
    if (!tag.name) continue;

    const name = tag.name.toLowerCase();

    switch (name) {
      case "越南语":
      case "vietnamese":
        return "vietnamese";

      case "英语":
      case "english":
        return "english";

      case "法语":
      case "french":
        return "french"; // sửa đúng chính tả

      case "西班牙语":
      case "spanish":
        return "spanish";

      case "印尼语":
      case "indonesian":
        return "indonesian";

      case "日语":
      case "japanese":
        return "japanese";

      case "意大利语":
      case "italian":
        return "italian";

      case "德语":
      case "german":
        return "german";

      case "泰语":
      case "thai":
        return "thai";

      case "俄语":
      case "russian":
        return "russian";

      case "韩语":
      case "korean":
        return "korean";

      case "土耳其语":
      case "turkish":
        return "turkish";

      case "葡萄牙语":
      case "portugues":
        return "portuguese";

      case "中文":
      case "chinese":
        return "chinese";

      default:
        break;
    }
  }

  return "none";
}

const filter_items = items.map((item) => {
  const biz_extra = item.common_attr.biz_extra;
  const biz_extra_object = JSON.parse(biz_extra || "{}");
  const { tone_avatar_url = {}, tonetype } = biz_extra_object;
  const tone_type_object = JSON.parse(tonetype || "{}");
  const { voice_type = "" } = tone_type_object;
  const language = detectCapcutLanguage(item.common_attr.tag_list);

  return {
    id: item.common_attr.id,
    title: item.common_attr.title,
    avatar: tone_avatar_url?.url,
    key: voice_type,
    language,
    tags: item.common_attr.tag_list,
  };
});

const unique_filter_items = filter_items.reduce((acc, cur) => {
  if (!acc.find((item) => item.key === cur.key)) {
    acc.push(cur);
  }
  return acc;
}, []);

fs.writeFileSync(
  "output.json",
  JSON.stringify(unique_filter_items, null, 2),
  "utf-8"
);
