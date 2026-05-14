const markdownIt = require("markdown-it");

const timeZone = "Asia/Shanghai";

function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

module.exports = function configureEleventy(eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    })
  );

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });

  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("readableDate", (value) => {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone,
    }).format(toDate(value));
  });

  eleventyConfig.addFilter("isoDate", (value) => toDate(value).toISOString());

  eleventyConfig.addFilter("absoluteUrl", (value, baseUrl) => {
    return new URL(value, baseUrl).toString();
  });

  eleventyConfig.addFilter("xmlEscape", (value) => {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/文章/*.md")
      .sort((leftPost, rightPost) => rightPost.date - leftPost.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
