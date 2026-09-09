const phone = $argument.phone
const pwd = $argument.pwd
const num = $argument.num
const notify = $argument.notify_switch

console.log("【森林step】定时脚本被触发")
console.log("phone="+phone+" num="+num+" cron_enable="+$argument.cron_enable+" notify="+notify)

if (!$argument.cron_enable || !phone || !pwd || !num) {
    console.log("【森林step】参数不全或者开关关闭，直接退出")
    $done()
    return
}

const url = "http://8.140.250.130/king/api/step"
const postBody = `phone=${encodeURIComponent(phone)}&pwd=${encodeURIComponent(pwd)}&num=${encodeURIComponent(num)}`

const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    "X-Requested-With": "XMLHttpRequest",
    "Referer":"http://8.140.250.130/bushu/"
}

console.log("【森林step】开始POST请求，body="+postBody)
$httpClient.post({
    url: url,
    headers: headers,
    body: postBody
}, function(error, response, data){
    if(error){
        console.log("【森林step】定时任务请求失败：" + error)
        if(notify){
            $notification.post("森林step任务","❌执行失败","错误："+String(error))
        }
    }else{
        console.log("【森林step】定时任务返回：" + data)
        try {
            const resJson = JSON.parse(data)
            if(resJson.code === 200){
                if(notify){
                    $notification.post("森林step任务","✅执行成功","接口返回success")
                }
            }else{
                if(notify){
                    $notification.post("森林step任务","⚠️接口异常","返回："+data)
                }
            }
        }catch(e){
            if(notify){
                $notification.post("森林step任务","⚠️返回解析错误","原始响应："+data)
            }
        }
    }
    $done()
})
