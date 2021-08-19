package com.sparta.finalproject.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Keyword extends Timestamped{

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String keyword;

    public Keyword(String keyword){
        this.keyword = keyword;
    }

    // Controller에서 create(PostMapping)할 때 사용
    public Keyword(KeywordRequestDto requestDto){
        this.keyword = requestDto.getKeyword();
    }

    // Service에서 update할 때 사용
    public void update(KeywordRequestDto requestDto){
        this.keyword = requestDto.getKeyword();
    }
}
