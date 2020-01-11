#注册接口

接口地址：http://localhost:3000/users/register
返回格式：json
请求方式：post


请求参数说明：
名称	    必填	类型	 说明
username	是	   string	用户ID
password    是     string   用户密码
captch      是     string   验证码


返回参数说明：
名称	 类型	  说明
code     number  服务器状态
errmsg   string  报错信息
data     Object  返回给客户端的信息	



userLevel:
    初始值:0----普通用户
    初始值:1----VIP1用户
    初始值:2----VIP2用户
    初始值:99----管理员


#登录接口

接口地址：http://localhost:3000/users/login
返回格式：json
请求方式：post


请求参数说明：
名称	    必填	类型	 说明
username	是	   string	用户ID
password    是     string   用户密码
captch      是     string   验证码


返回参数说明：
名称	 类型	  说明
code     number  服务器状态
errmsg   string  报错信息
data     Object  返回给客户端的信息	