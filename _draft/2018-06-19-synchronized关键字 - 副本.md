---
layout: post
title: "Java synchronized 关键字"
author: "nice01qc"
categories: "Java"
excerpt_separator: "..."
---

> Java synchronized 关键字...

#### synchronized的三种应用方式



1、*synchronized作用于实例方法（不包括静态方法）：**锁住的是实例***

```java
	public class TestSync implements Runnable{
    //共享资源(临界资源)
    static int i=0;

    public synchronized void increase(){  // synchronized 修饰实例方法
        i++;
    }
    @Override
    public void run() {
        for(int j=0;j<10000;j++){
            increase();
        }
    }
    public static void main(String[] args) throws InterruptedException {
        TestSync instance=new TestSync();	// 只有一个实例
        Thread t1=new Thread(instance);	// 如果new Thread()中参数不是同一个实例，则不会被锁住
        Thread t2=new Thread(instance);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(i);
    }
    /**
     * 输出结果:
     * 20000
     */
}
```



2、*synchronized作用于静态方法：**锁住的是class对象***

```java
public class TestSyncClass implements Runnable{
    static int i=0;
    /**
     * 作用于静态方法,锁是当前class对象,也就是
     * TestSyncClass类对应的class对象
     */
    public static synchronized void increase(){
        i++;
    }

    @Override
    public void run() {
        for(int j=0;j<10000;j++){
            increase();
        }
    }
    public static void main(String[] args) throws InterruptedException {
        //new新实例
        Thread t1=new Thread(new TestSyncClass());
        //new心事了
        Thread t2=new Thread(new TestSyncClass());
        //启动线程
        t1.start();t2.start();

        t1.join();t2.join();
        System.out.println(i);	// 结果小于20000了
    }
}
```

3、*synchronized同步代码块*

```java
public class TestSync implements Runnable{
    static TestSync instance=new TestSync();
    static int i=0;
    @Override
    public void run() {
        
        /*
         * 使用同步代码块对变量i进行同步操作,锁对象为静态实例instance
         * 关键看synchronized（）中锁住的是什么，若是静态变量，则锁住了当前类的class对象，
         * 若不是，则锁住的是各自的实例对象
         * 锁住class类最直接的就是传入class对象便可
         */
        synchronized(instance){
            for(int j=0;j<1000000;j++){
                    i++;
              }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(instance);
        Thread t2=new Thread(instance);
        t1.start();t2.start();
        t1.join();t2.join();
        System.out.println(i);
    }
}
```



#### synchronized底层语义原理

见https://blog.csdn.net/javazejian/article/details/72828483，里面很详细，内容比较丰富。

- [ ] javap -c *.class 可以查看相应变化

#### Java虚拟机对synchronized的优化

偏向所 -> 轻量级锁 -> 自旋锁

锁消除



#### 关于synchronized 可能需要了解的关键点

1. synchronized具有可重入性
2. 线程中断：

```java
//中断线程（实例方法）
public void Thread.interrupt();

//判断线程是否被中断（实例方法）
public boolean Thread.isInterrupted();

//判断是否被中断并清除当前中断状态（静态方法）
public static boolean Thread.interrupted();

synchronized (obj) {
       obj.wait();
       obj.notify();
       obj.notifyAll();         
 }
```

*sleep方法不同的是wait方法调用完成后，线程将被暂停，但wait方法将会释放当前持有的监视器锁(monitor)，直到有线程调用notify/notifyAll方法后方能继续执行，而sleep方法只让线程休眠并不释放锁。同时notify/notifyAll方法调用后，并不会马上释放监视器锁，而是在相应的synchronized(){}/synchronized方法执行结束后才自动释放锁。* 



**参考资源：**

> [深入理解Java并发之synchronized实现原理](https://blog.csdn.net/javazejian/article/details/72828483)

> [《Java并发编程的艺术》](https://book.douban.com/subject/26591326/)



















