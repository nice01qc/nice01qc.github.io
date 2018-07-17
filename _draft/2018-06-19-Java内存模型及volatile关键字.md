---
layout: post
title: " Java内存模型(JMM)及volatile关键字"
author: "nice01qc"
categories: "Java"
excerpt_separator: "..."
---

>  Java内存模型(JMM)及volatile关键字...



- 理解Java内存区域与Java内存模型
  - Java内存区域
  - Java内存模型概述
- 硬件内存架构与Java内存模型
  - 硬件内存架构
  - Java内存模型与硬件内存架构的关系
- JMM存在的必要性
- Java内存模型（JMM）的承诺
  - 原子性
  - 理解指令重排
    - 编译器重排
    - 处理器指令重排
  - 可见性
  - 有序性
  - JMM提供的解决方案
  - 理解JMM中的happens-before 原则
- volatile内存语义
  - volatile的可见性
  - volatile禁止重排优化



# volatile内存语义

volatile在并发编程中很常见，但也容易被滥用，现在我们就进一步分析volatile关键字的语义。volatile是Java虚拟机提供的轻量级的同步机制。volatile关键字有如下两个作用

- 保证被volatile修饰的共享gong’x变量对所有线程总数可见的，也就是当一个线程修改了一个被volatile修饰共享变量的值，新值总数可以被其他线程立即得知。
- 禁止指令重排序优化。



## volatile的可见性

关于volatile的可见性作用，我们必须意识到被volatile修饰的变量对所有线程总数立即可见的，对volatile变量的所有写操作总是能立刻反应到其他线程中，但是对于volatile变量运算操作在多线程环境并不保证安全性 。

```java
volatile int x = 0;
x++; // 由两步组成，线程不安全
x=100; // 就这一步，线程安全
```





> **如果要详细内容见参考资源第一个链接**。



**参考资源：**

> [全面理解Java内存模型(JMM)及volatile关键字](https://blog.csdn.net/javazejian/article/details/72772461)

> [《Java并发编程的艺术》](https://book.douban.com/subject/26591326/)



















