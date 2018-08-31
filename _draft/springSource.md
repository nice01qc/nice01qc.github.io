```java
// 1、getHandler(request)
	protected HandlerExecutionChain getHandler(HttpServletRequest request){
		for (HandlerMapping hm : this.handlerMappings) {
			if (logger.isTraceEnabled()) {
				
			}
			HandlerExecutionChain handler = hm.getHandler(request);
			if (handler != null) {
				return handler;
			}
		}
		return null;
	}
```

`handlerMapping`有

`RequestMappingHandlerMapping`

`BeanNameUrlHandlerMappinp`

`SimpleUrlHandlerMapping`





`HandlerAdapter`有
`RequestMappingHandlerAdapter`
`HttpRequestHandlerAdapter`
`SimpleControllerHandlerAdapter`







------

#### 关于bean创建

###### `getSingleton`

```java
//DefaultSingletonBeanRegistry下的
/** Cache of singleton factories: bean name --> ObjectFactory */
private final Map<String, ObjectFactory> singletonFactories;

/** Cache of early singleton objects: bean name --> bean instance */
private final Map<String, Object> earlySingletonObject;

/** Cache of singleton factories: bean name --> ObjectFactory */
private final Map<String, ObjectFactory> singletonFactories

protected Object getSingleton(String beanName, boolean allowEarlyReference) {
    Object singletonObject = this.singletonObjects.get(beanName);
    if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
        synchronized (this.singletonObjects) {
            singletonObject = this.earlySingletonObjects.get(beanName);
            if (singletonObject == null && allowEarlyReference) {
                ObjectFactory singletonFactory = his.singletonFactories.get(beanName);
                if (singletonFactory != null) {
                    singletonObject = singletonFactory.getObject();
                    this.earlySingletonObjects.put(beanName, singletonObject);
                    this.singletonFactories.remove(beanName);
                }
            }
        }
    }
    return (singletonObject != NULL_OBJECT ? singletonObject : null);
}

```

```java
// FactoryBeanRegistrySupport
/** Cache of singleton objects created by FactoryBeans: FactoryBean name --> object */
private final Map<String, Object> factoryBeanObjectCache;




```



```java
// DefaultListableBeanFactory
/** Map of bean definition objects, keyed by bean name */
private final Map<String, BeanDefinition> beanDefinitionMap




```













```java
// 关于处理
//FactoryBeanRegistrySupport
protected Object postProcessObjectFromFactoryBean(Object object, String beanName)；


// 在getObjectForBeanInstance最后调用getObject工厂方法后
private Object doGetObjectFromFactoryBean(
        final FactoryBean factory, final String beanName, final boolean shouldPostProcess)
        throws BeanCreationException {

    Object object;
    try {
        if (System.getSecurityManager() != null) {
            AccessControlContext acc = getAccessControlContext();
            try {
                object = AccessController.doPrivileged(new PrivilegedExceptionAction<Object>() {
                    public Object run() throws Exception {
                            return factory.getObject();
                        }
                    }, acc);
            }
            catch (PrivilegedActionException pae) {
                throw pae.getException();
            }
        }
        else {
            object = factory.getObject();
        }
    }
    catch (FactoryBeanNotInitializedException ex) {
        throw new BeanCurrentlyInCreationException(beanName, ex.toString());
    }
    catch (Throwable ex) {
        throw new BeanCreationException(beanName, "FactoryBean threw exception on object creation", ex);
    }


    // Do not accept a null value for a FactoryBean that's not fully
    // initialized yet: Many FactoryBeans just return null then.
    if (object == null && isSingletonCurrentlyInCreation(beanName)) {
        throw new BeanCurrentlyInCreationException(
                beanName, "FactoryBean which is currently in creation returned null from getObject");
    }
	// 这里调用了postProcessObjectFromFactoryBean
    if (object != null && shouldPostProcess) {
        try {
            // 最后applyBeanPostProcessorsAfterInitialization
            object = postProcessObjectFromFactoryBean(object, beanName);
        }
        catch (Throwable ex) {
            throw new BeanCreationException(beanName, "Post-processing of the FactoryBean's object failed", ex);
        }
    }

    return object;
}




```

```java
// AutowireCapableBeanFactory
// applyBeanPostProcessorsAfterInitialization
```



```
applyBeanPostProcessorsBeforeInstantiation：BeanPostProcessor：InstantiationAwareBeanPostProcessor：postProcessBeforeInstantiation



applyBeanPostProcessorsAfterInitialization：BeanPostProcessor：postProcessAfterInitialization
```

