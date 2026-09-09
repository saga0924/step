const phone = $argument.phone
const pwd = $argument.pwd
const num = $argument.num

// 参数校验
if (!$argument.cron_enable || !phone || !pwd || !num) {
    $done()
    return
}

const url = "http://8.140.250.130/king/api/step"
const postBody = `phone=${encodeURIComponent(phone)}&pwd=${encodeURIComponent(pwd)}&num=${encodeURIComponent(num)}`

const headers = {
    "Content‑Type": "application/x‑www‑form‑urlencoded; charset=UTF‑8",
    "User‑Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    "X‑Requested‑With": "XMLHttpRequest",
    "Referer":"http://8.140.250.130/bushu/"
}

$httpClient.post({
    url: url,
    headers: headers,
    body: postBody
}, function(error, response, data){
    if(error){
        console.log("定时任务请求失败：" + error)
    }else{
        console.log("定时任务返回：" + data)
    }
    $done()
})
