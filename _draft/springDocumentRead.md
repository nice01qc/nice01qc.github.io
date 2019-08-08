**Bean Definition Inheritance**

- Similarly, the container’s internal `preInstantiateSingletons()` method ignores bean definitions that are defined as abstract.



[ **Container Extension Points**](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-factory-extension)

- `BeanPostProcessor` :If you want to implement some custom logic after the Spring container finishes instantiating, configuring, and initializing a bean, you can plug in one or more custom `BeanPostProcessor` implementations.
- `BeanFactoryPostProcessor`:To change the actual bean definition (that is, the blueprint that defines the bean), you instead need to use a it.
- 