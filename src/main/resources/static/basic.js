// 사용자가 뉴스 키워드를 올바르게 입력하였는지 확인합니다.
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

// 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
// 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
function editPost(id) {
    showEdits(id);
    let keyword = $(`#${id}-keyword`).text().trim();
    $(`#${id}-textarea`).val(keyword);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-keyword`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-keyword`).show();
    $(`#${id}-edit`).show();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 여기서부터 코드를 작성해주시면 됩니다.

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
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

    getKeywords();
    getNews();

})

// 뉴스를 불러와서 보여줍니다.
function getNews() {
    $('#news-cards').empty();

    $('.text').each(function() {
        var query = $(this).text().trim();
        // console.log($(this).text().trim());
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

// 키워드 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addNews(newsDto) {
    return `<div class="card-body">
                <h5 class="card-title"><a href="${newsDto.link}">${newsDto.title}</a></h5>
                <p class="card-text">${newsDto.desc}</p>
                <p class="card-text"><small class="text-muted">${newsDto.pubdate}</small></p>
            </div>`
}

// 키워드를 불러와서 보여줍니다.
function getKeywords() {
    // 1. 기존 키워드 내용을 지웁니다.
    $('#cards-box').empty();

    // 2. 키워드 목록을 불러와서 HTML로 붙입니다.
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
}

// 키워드 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, keyword, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
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

    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}

// 키워드를 생성합니다.
function writePost() {
    // 1. 작성한 키워드를 불러옵니다.
    let keyword= $('#keyword').val();

    // 2. 작성한 키워드가 올바른지 isValidKeyword 함수를 통해 확인합니다.
    if (isValidKeyword(keyword) == false) {
        return;
    }

    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'keyword': keyword};

    // 5. POST /api/keyword 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/keyword",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('키워드가 성공적으로 등록되었습니다.');
            window.location.reload();
        }
    });
}

// 키워드를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 키워드의 keyword 를 확인합니다.
    let keyword = $(`#${id}-textarea`).val().trim();

    // 2. 작성한 키워드가 올바른지 isValidKeyword 함수를 통해 확인합니다.
    if (isValidKeyword(keyword) == false) {
        return;
    }

    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'keyword': keyword};

    // 4. PUT /api/keyword/{id} 에 data를 전달합니다.
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

// 키워드를 삭제합니다.
function deleteOne(id) {
    // 1. DELETE /api/keyword/{id} 에 요청해서 키워드를 삭제합니다.
    $.ajax({
        type: "DELETE",
        url: `/api/keyword/${id}`,
        success: function (response) {
            alert('키워드 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}