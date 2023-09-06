const express = require('express')
const bodyParser = require('body-parser')
const obj = require('./obj')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/lists', (request, response) => {

    response.send({
        code: '200',
        msg: ' successfully',
        data: obj
    })
})

app.get('/search/:name', (request, response) => {
    let resData = obj.filter(v => {
        return v.name.toLowerCase() === request.params.name.toLowerCase()
    })
    if (!resData) {
        response.send('404')
    }
    response.send({
        code: '200',
        msg: 'search successfully',
        data: resData
    })
})

app.post('/update/:id', (request, response) => {
    console.log(request.body)
    const {

        name,
        avatar,
        twitter,
        notes,
        favorite
    } = request.body
    let flag = false
    obj.forEach(v => {
        if (v.id === request.params.id) {
            flag = true
            v = Object.assign(v, {
                name,
                avatar,
                twitter,
                notes,
                favorite
            })
        }
    })
    if (!flag) {
        obj.push({
            id: request.params.id,
            name,
            avatar,
            twitter,
            notes,
            favorite: false
        })
    }
    console.log(obj)
    response.send({
        code: '200',
        msg: 'update successfully',
    })
})
app.post('/delete/:id', (request, response) => {
    obj.forEach((v, index, arr) => {
        if (v.id === request.params.id) {
            arr.splice(index, 1)
        }
    })

    response.send({
        code: '200',
        msg: 'delete successfully',
    })
})

app.all('*', (request, response) => {
    response.send('404 Not Found')
})

app.listen(8888, () => {
    console.log('服务已经启动了')
})