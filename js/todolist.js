// 入口函数
$(function () {
    load();
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入待办事项");
            } else {
                // 读取本地存储原来的数据
                var local = getData();
                console.log(local);
                // 给数组追加元素
                local.push({ title: $(this).val(), done: false });
                // 把数组存储到本地
                saveData(local);
                load();
                $(this).val("");
            }
        }
    });
    // 删除操作
    $('ol,ul').on("click", "a", function () {
        // 先获取本地存储
        var data = getData();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        // 保存数据
        saveData(data);
        // 渲染数据
        load();
    });
    // 正在进行和已完成选项操作
    $("ol, ul").on('click', 'input', function () {
        // // 读取本地存储原来的数据
        var data = getData();
        // // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // console.log(data[index].done);
        // data[index].done = $(this).prop("checked");
        data[index].done = $(this).prop("checked");
        // console.log(data[index].done);
        // console.log(data);
        // // 保存数据
        saveData(data);
        // // 渲染数据
        load();
    })
    // 读取本地存储原来的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储的数据是字符串格式的，我们需要的是对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));

    }
    // 渲染加载数据
    function load() {
        var todoCount = 0;
        var doneCount = 0;
        var data = getData()
        // 遍历之前先要清空ol里面的元素内容
        $('ol').empty();
        $('ul').empty();
        // 遍历和追加数据
        $.each(data, function (i, n) {
            if (n.done) {
                // $('ul').prepend("<li><input type = 'checkbox'><p>" + n.title + "</p><a href = 'javascript:;' id = " + i + "></a>'</li>");
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})