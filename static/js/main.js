// variables
let userName = null;
let state = 'SUCCESS';

// functions
function Message(arg) {
    this.text = arg.text;
    this.message_side = arg.message_side;

    this.draw = function (_this) {
        return function () {
            let $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);

            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
}

function getMessageText() {
    let $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
}

function sendMessage(text, message_side) {
    let $messages, message;
    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: message_side
    });
    message.draw();
    $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
}

function greet() {
    setTimeout(function () {
        return sendMessage("안녕하세요, 도담도담에 오신 것을 환영합니다!", 'left');
    }, 1000);

    setTimeout(function () {
        return sendMessage("사용할 닉네임을 알려주세요.", 'left');
    }, 2000);
}

function onClickAsEnter(e) {
    if (e.keyCode === 13) {
        onSendButtonClicked()
    }
}

function setUserName(username) {

    if (username != null && username.replace(" ", "" !== "")) {
        setTimeout(function () {
            return sendMessage("반갑습니다." + username + "님. 닉네임이 설정되었습니다.", 'left');
        }, 1000);
        setTimeout(function () {
            return sendMessage("저는 도움이 되는 여러 정보를 알려주는 물고기 친구, 도담이라고 합니다.", 'left');
        }, 2000);
        setTimeout(function () {
            return sendMessage("관상어 종류나 애플리케이션 사용 방법, 그리고 날씨, 미세먼지, 맛집, 관광지에 대해 무엇이든 물어보세요!", 'left');
        }, 3000);

        return username;

    } else {
        setTimeout(function () {
            return sendMessage("올바른 닉네임을 이용해주세요.", 'left');
        }, 1000);

        return null;
    }
}

function requestChat(messageText, url_pattern) {
    $.ajax({
        url: "http://172.20.10.4:8080/" + url_pattern + '/' + userName + '/' + messageText,
        type: "GET",
        dataType: "json",
        success: function (data) {
            state = data['state'];

            if (state === 'SUCCESS') {
                return sendMessage(data['answer'], 'left');
            } else if (state === 'REQUIRE_LOCATION') {
                return sendMessage('어느 지역을 알려드릴까요?', 'left');
            } else {
                return sendMessage('죄송합니다. 무슨말인지 잘 모르겠어요.', 'left');
            }
        },

        error: function (request, status, error) {
            console.log(error);

            return sendMessage('죄송합니다. 서버 연결에 실패했습니다.', 'left');
        }
    });
}

function onSendButtonClicked() {
    let messageText = getMessageText();
    sendMessage(messageText, 'right');

    if (userName == null) {
        userName = setUserName(messageText);

    } else {
        if (messageText.includes('안녕')) {  // 대사 추가
            setTimeout(function () {
                return sendMessage("안녕하세요. 저는 도담이예요.", 'left');
            }, 1000);
        }else if(messageText.includes('도담아')){
            setTimeout(function(){
                return sendMessage("네, 저는 도담이입니다! 무엇을 원하시나요?", 'left');
            }, 1000);
        } else if (messageText.includes('고마워')) {
            setTimeout(function () {
                return sendMessage("천만에요!", 'left');
            }, 1000);
        } else if (messageText.includes('관상어')) {
            setTimeout(function () {
                return sendMessage("주로 키우는 관상어의 종류로는 구피, 베타, 엔젤, 네온 등이 있습니다. 어떤 관상어에 대해 알고싶으신가요?", 'left');
            }, 1000);
        }else if (messageText.includes('고양이')) {
            setTimeout(function () {
                return sendMessage("귀여워", 'left');
            }, 1000);
        } else if (messageText.includes('물고기')) {
            setTimeout(function () {
                return sendMessage("어떤 종류의 관상어가 궁금하시나요?", 'left');
            }, 1000);
        } else if(messageText.includes('물고기') && messageText.includes('종류')){
            setTimeout(function(){
                return sendMessage("주로 키우는 관상어의 종류로는 구피, 베타, 엔젤, 네온 등이 있습니다. 어떤 관상어에 대해 알고싶으신가요?", 'left');
            }, 1000);
        } else if(messageText.includes('관상어') && messageText.includes('종류')){
            setTimeout(function(){
                return sendMessage("주로 키우는 관상어의 종류로는 구피, 베타, 엔젤, 네온 등이 있습니다. 어떤 관상어에 대해 알고싶으신가요?", 'left');
            }, 1000);
        } else if(messageText.includes('구피')){
            setTimeout(function(){
                return sendMessage("구피는 몸길이가 3~4cm 정도 되는 송사리과의 열대어입니다. 초보자부터 시작해서 전문 애호가까지 두루 사랑을 받고 있습니다. 번식력이 좋으며, 쉽게 키울 수 있습니다. 사육 적정 수온은 24~26도 정도입니다.", 'left');
            }, 1000);
        } else if(messageText.includes('베타')){
            setTimeout(function(){
                return sendMessage("베타는 화려한 컬러와 지느러미를 가진, 버들붕어과에 속하는 열대어입니다. 몸길이는 5cm 정도이며 좁은 어항에서도 대체적으로 기를 수 있습니다. 다만, 암수의 합사가 불가능합니다. 사육 적정 수온은 25~27도 정도입니다.", 'left');
            }, 1000);
        }else if(messageText.includes('엔젤')){
            setTimeout(function(){
                return sendMessage("엔젤피쉬는 시클리드과의 담수어입니다. 보통 삼각형 형태의 지느러미를 가지며, 선명한 줄무늬를 띄는 경우도 있습니다. 사육 적정 수온은 24~28도 정도입니다.", 'left');
            }, 1000);
        }else if(messageText.includes('네온')){
            setTimeout(function(){
                return sendMessage("네온테트라는 떼를 지어다니는 습성이 있는 카라신과의 열대어입니다. 몸에 선명한 형광색 줄무늬가 있으며, 군영하는 모습이 아름다워 인기가 많습니다. 사육 적정 수온은 26~28도 정도입니다.", 'left');
            }, 1000);
        }else if(messageText.includes('앱')){
            setTimeout(function(){
                return sendMessage("네, 애플리케이션에 대한 어떤 점이 알고싶으신가요?", 'left');
            }, 1000);
        }else if(messageText.includes('애플리케이션')){
            setTimeout(function(){
                return sendMessage("네, 애플리케이션에 대한 어떤 점이 알고싶으신가요?", 'left');
            }, 1000);
        }else if(messageText.includes('도담도담')){
            setTimeout(function(){
                return sendMessage("도담도담은 스마트 수조 관리 애플리케이션입니다! 어떤 점이 알고싶으신가요?", 'left');
            }, 1000);
        }else if(messageText.includes('온도' && '설정')){
            setTimeout(function(){
                return sendMessage("온도 설정은 '설정' 화면에서 변경할 수 있습니다!", 'left');
            }, 1000);
        }else if(messageText.includes('조명' && '설정')){
            setTimeout(function(){
                return sendMessage("온도 설정은 메인 화면에서 태양 모양을 클릭하여 켜고 끌 수 있습니다!", 'left');
            }, 1000);
        }else if(messageText.includes('경고')){
            setTimeout(function(){
                return sendMessage("메인 화면의 경고창 및 상단바의 알림은 '설정' 화면에서 변경할 수 있습니다~", 'left');
            }, 1000);
        }else if(messageText.includes('알림')){
            setTimeout(function(){
                return sendMessage("메인 화면의 경고창 및 상단바의 알림은 '설정' 화면에서 변경할 수 있습니다~", 'left');
            }, 1000);

        } else if (state.includes('REQUIRE')) {
            return requestChat(messageText, 'fill_slot');
        } else {
            return requestChat(messageText, 'request_chat');
        }
    }
}