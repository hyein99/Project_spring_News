package com.sparta.finalproject.models;

import lombok.Getter;
import org.json.JSONObject;

@Getter
public class NewsDto {
    private String title;
    private String link;
    private String desc;
    private String pubdate;

    public NewsDto(JSONObject itemJson){
        this.title = itemJson.getString("title");
        this.link = itemJson.getString("link");
        this.desc = itemJson.getString("description");
        this.pubdate = itemJson.getString("pubDate");
    }
}
