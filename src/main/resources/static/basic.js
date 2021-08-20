
// HTML 문서를 로드할 때마다 실행하는 함수
$(document).ready(function () {
    getKeywords();
    getNews();

    // 키워드 입력창에 Enter를 입력하면 writePost() 실행
    $('#keyword').on('keypress', function (e) {
        if (e.key == 'Enter') {
            writePost();
        }
    });

    // 뉴스보기, 키워드 보기 Tab
   $('.nav div.nav-news').on('click', function () {
        $('.nav-news').addClass('active');
        $('.nav-keyword').removeClass('active');

        $('.news-area').show();
        $('.keyword-area').hide();

        getNews();
    })

    $('.nav div.nav-keyword').on('click', function () {
        $('.nav-keyword').addClass('active');
        $('.nav-news').removeClass('active');

        $('.news-area').hide();
        $('.keyword-area').show();
    })

    $('.news-area').show();
    $('.keyword-area').hide();


})

// 사용자가 뉴스 키워드를 올바르게 입력하였는지 확인하는 함수
function isValidKeyword(keyword) {
    if (keyword == '') {
        alert('키워드을 입력해주세요');
        return false;
    }
    if (keyword.trim().length > 15) {
        alert('공백 포함 15자 이하로 입력해주세요');
        return false;
    }
    return true;
}

// 뉴스를 불러오는 함수
function getNews() {
    $('#news-cards').empty();

    $('.text').each(function() {
        var query = $(this).text().trim();
        console.log(query);
        $.ajax({
            type: 'GET',
            url: `/api/search?query=${query}`,
            success: function (response){
                for (let i=0; i<response.length; i++){
                    let newsDto = response[i];
                    let tempHtml = addNews(newsDto);
                    $('#news-cards').append(tempHtml);
                }
            }
        })
    });
}

// 뉴스내용을 HTML 카드로 만드는 함수
function addNews(newsDto) {
    return `<div class="card-body">
                <h5 class="card-title"><a href="${newsDto.link}">${newsDto.title}</a></h5>
                <p class="card-text">${newsDto.desc}</p>
                <p class="card-text"><small class="text-muted">${newsDto.pubdate}</small></p>
            </div>`
}

// 키워드를 불러오는 함수
function getKeywords() {
    $('#cards-box').empty();

    $.ajax({
        type: "GET",
        url: "/api/keyword",
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let id = message['id'];
                let keyword = message['keyword'];
                let modifiedAt = message['modifiedAt'];
                addHTML(id, keyword, modifiedAt);
            }
        }
    });
    getNews();
}

// 키워드 내용은 HTML 카드로 만드는 함수
function addHTML(id, keyword, modifiedAt) {
    let tempHtml = `<div class="card">
                        <div class="card-body keyword">
                            <p class="date">${modifiedAt}</p>
                            <div class="keyword">
                                <div id="${id}-keyword" class="text">
                                    ${keyword}
                                </div>
                                <div id="${id}-editarea" class="edit">
                                    <textarea id="${id}-textarea" class="text-edit"></textarea>
                                </div>
                            </div>
            
                            <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                            <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                            <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                        </div>
                    </div>`

    $('#cards-box').append(tempHtml);
}

// 버튼과 area 숨기기 및 보여주기를 실행하는 함수
function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-keyword`).hide();
    $(`#${id}-edit`).hide();
}

// 키워드를 생성하는 함수
function writePost() {
    let keyword= $('#keyword').val();
    if (isValidKeyword(keyword) == false) {
        return;
    }
    let data = {'keyword': keyword};

    $.ajax({
        type: "POST",
        url: "/api/keyword",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('키워드가 성공적으로 등록되었습니다.');
            window.location.reload();
        }
    });
}

// 키워드를 수정하는 함수
function editPost(id) {
    showEdits(id);
    // 기존 작성 내용을 textarea 에 전달
    let keyword = $(`#${id}-keyword`).text().trim();
    $(`#${id}-textarea`).val(keyword);
}

// 키워드를 삭제하는 함수
function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/keyword/${id}`,
        success: function (response) {
            alert('키워드 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}

// 키워드를 수정하는 함수
function submitEdit(id) {
    let keyword = $(`#${id}-textarea`).val().trim();
    if (isValidKeyword(keyword) == false) {
        return;
    }
    let data = {'keyword': keyword};

    $.ajax({
        type: "PUT",
        url: `/api/keyword/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('키워드 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}
