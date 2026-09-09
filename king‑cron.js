const phone = $argument.phone
const pwd = $argument.pwd
const num = $argument.num

if(!$argument.enable || !phone || !pwd || !num){
    $done({})
    return
}

const body = `phone=${encodeURIComponent(phone)}&pwd=${encodeURIComponent(pwd)}&num=${encodeURIComponent(num)}`
$done({body: body})
