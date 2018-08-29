### InnoDB存储引擎中的锁



#### 四种事物隔离级别

1. READ COMMITTED



















































#### mysql的三种外键约束方式

```sql
CREATE TABLE parent(
	id int not null,
	name VARCHAR(30),
	PRIMARY key(id)
)ENGINE=INNODB;
insert into parent values(1,'p1'),(2,'p2');

# 1、child级联方式(cascade)
	CREATE TABLE child(
		id int not null,
		name VARCHAR(30),
		parentid int,
		PRIMARY KEY(id),
		FOREIGN KEY(parentid) REFERENCES parent(id) ON DELETE CASCADE ON UPDATE CASCADE
	)ENGINE=INNODB;
	insert into child values(1,'kangkang',1),(2,'Jake',2);  #成功
	insert into child values(3,'Mary',3); #失败，parent中没有id为3

	delete from parent where id = 1;  #导致child中parentid为1的数据整行都会被删除

# 2、child置空方式(set null)
	#新建child表,只修改约束部分，改为 "ON DELETE SET NULL ON UPDATE SET NULL"
	#与1级联约束不同的是：
	delete from parent where id = 1;  #导致child中parentid为1的值置为‘null’

# 3、禁止方式(noaction / restrict)
	#新建child表,只修改约束部分，改为 "ON DELETE NO ACTION ON UPDATE NO ACTION"
	#与1级联约束不同的是：
	delete from parent where id = 1;  #由于child中引用，parent无法删除，除非child中没有此引用
```























