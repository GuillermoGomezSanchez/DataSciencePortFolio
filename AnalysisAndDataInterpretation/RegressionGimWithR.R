#Por Raul V. Ram rez Velarde
#Agosto 2020
#De multiples fuentes

"
[, 1]	mpg	Miles/(US) gallon
[, 2]	cyl	Number of cylinders
[, 3]	disp	Displacement (cu.in.)
[, 4]	hp	Gross horsepower
[, 5]	drat	Rear axle ratio
[, 6]	wt	Weight (1000 lbs)
[, 7]	qsec	1/4 mile time
[, 8]	vs	Engine (0 = V-shaped, 1 = straight)
[, 9]	am	Transmission (0 = automatic, 1 = manual)
[,10]	gear	Number of forward gears
[,11]	carb	Number of carburetors"

#Biblitecas
library(car)
library(data.table)
library(corrplot)
library(ggplot2)

#cargar datos
data(mtcars)
attach(mtcars)

cor(mpg,hp)
correlations=cor(mtcars)
corrplot(correlations, method = "circle")

#crear modelo de regresion
cars.lm=lm(mpg~hp)
#ver el resultado
print(summary(cars.lm)) #pvalor debe ser menor a 0.05
#debido a que el coeficiente sacando el intervalo de confianza no sea cero
#es que se le dan las 3 estrellas
Call:
  lm(formula = mpg ~ hp)

Residuals:
  Min      1Q  Median      3Q     Max 
-5.7121 -2.1122 -0.8854  1.5819  8.2360 

Coefficients:
  Estimate Std. Error t value Pr(>|t|)    
(Intercept) 30.09886    1.63392  18.421  < 2e-16 ***
  hp          -0.06823    0.01012  -6.742 1.79e-07 ***
  ---
  Signif. codes:  0  ***  0.001  **  0.01  *  0.05  .  0.1     1

Residual standard error: 3.863 on 30 degrees of freedom
Multiple R-squared:  0.6024,	Adjusted R-squared:  0.5892 
F-statistic: 45.46 on 1 and 30 DF,  p-value: 1.788e-07

#Obtain condidence intervals
confint(cars.lm)
#grafico de residuos
plot(cars.lm$residuals)
#linea cero
abline(h=0)
#ver los puntos originales
plot(hp,mpg)
#originales contra prediccion
points(hp,predict(cars.lm),type="l")
#nuevo modelo lineal con ecuacion de dise o
cars.lm=lm(mpg~1+hp)

print(summary(cars.lm))

Call:
  lm(formula = mpg ~ 1 + hp)

Residuals:
  Min      1Q  Median      3Q     Max 
-5.7121 -2.1122 -0.8854  1.5819  8.2360 

Coefficients:
  Estimate Std. Error t value Pr(>|t|)    
(Intercept) 30.09886    1.63392  18.421  < 2e-16 ***
  hp          -0.06823    0.01012  -6.742 1.79e-07 ***
  ---
  Signif. codes:  0  ***  0.001  **  0.01  *  0.05  .  0.1     1

Residual standard error: 3.863 on 30 degrees of freedom
Multiple R-squared:  0.6024,	Adjusted R-squared:  0.5892 
F-statistic: 45.46 on 1 and 30 DF,  p-value: 1.788e-07
#p.value must be less than 0.05 and have "***"
#use cars.lm$ to see all the model has computed
#See confidence intervals for coefficients
#No coeffiente must have an interval around zero
confint(cars.lm,level=0.95)
#See prediction
fitted(cars.lm) 
predict(cars.lm)

#Quadratic model
cars.lm=lm(mpg~1+hp+I(hp^2))
print(summary(cars.lm))

Call:
  lm(formula = mpg ~ 1 + hp + I(hp^2))

Residuals:
  Min      1Q  Median      3Q     Max 
-4.5512 -1.6027 -0.6977  1.5509  8.7213 

Coefficients:
  Estimate Std. Error t value Pr(>|t|)    
(Intercept)  4.041e+01  2.741e+00  14.744 5.23e-15 ***
  hp          -2.133e-01  3.488e-02  -6.115 1.16e-06 ***
  I(hp^2)      4.208e-04  9.844e-05   4.275 0.000189 ***
  ---
  Signif. codes:  0  ***  0.001  **  0.01  *  0.05  .  0.1     1

Residual standard error: 3.077 on 29 degrees of freedom
Multiple R-squared:  0.7561,	Adjusted R-squared:  0.7393 
F-statistic: 44.95 on 2 and 29 DF,  p-value: 1.301e-09

#originales contra prediccion
plot(hp,mpg)
points(hp,predict(cars.lm),col="red")

#regresion multivariable
cars.lm=lm(mpg~1 + hp + cyl)
print(summary(cars.lm))

Call:
  lm(formula = mpg ~ 1 + hp + cyl)

Residuals:
  Min      1Q  Median      3Q     Max 
-4.4948 -2.4901 -0.1828  1.9777  7.2934 

Coefficients:
  Estimate Std. Error t value Pr(>|t|)    
(Intercept) 36.90833    2.19080  16.847  < 2e-16 ***
  hp          -0.01912    0.01500  -1.275  0.21253    
cyl         -2.26469    0.57589  -3.933  0.00048 ***
  ---
  Signif. codes:  0  ***  0.001  **  0.01  *  0.05  .  0.1     1

Residual standard error: 3.173 on 29 degrees of freedom
Multiple R-squared:  0.7407,	Adjusted R-squared:  0.7228 
F-statistic: 41.42 on 2 and 29 DF,  p-value: 3.162e-09

#ver residuos
plot(cars.lm$residuals)
#Determine correct variables by p.value and stars
multilm<-lm(formula = am~.,data=mtcars)
summary(multilm)
Call:
  lm(formula = am ~ ., data = mtcars)

Residuals:
  Min       1Q   Median       3Q      Max 
-0.46909 -0.16762 -0.00578  0.18601  0.35635 

Coefficients:
  Estimate Std. Error t value Pr(>|t|)
(Intercept)  1.6345145  1.9051573   0.858    0.401
mpg          0.0264792  0.0216086   1.225    0.234
cyl         -0.1207285  0.1038567  -1.162    0.258
disp        -0.0005716  0.0018504  -0.309    0.760
hp           0.0010378  0.0022712   0.457    0.652
drat         0.0952245  0.1672654   0.569    0.575
wt           0.0172805  0.2111832   0.082    0.936
qsec        -0.1125889  0.0731137  -1.540    0.139
vs          -0.2087048  0.2109738  -0.989    0.334
gear         0.1952458  0.1477420   1.322    0.201
carb        -0.0180503  0.0849746  -0.212    0.834

Residual standard error: 0.2717 on 21 degrees of freedom
Multiple R-squared:  0.7992,	Adjusted R-squared:  0.7036 
F-statistic:  8.36 on 10 and 21 DF,  p-value: 2.492e-05

#Good R-square, but coefficients have too large p.value

#Logistic regression
glogit<-glm(formula = am~wt+hp,data=mtcars,family = binomial,maxit=1000)
summary(glogit)

Call:
  glm(formula = am ~ wt + hp, family = binomial, data = mtcars, 
      maxit = 1000)

Deviance Residuals: 
  Min       1Q   Median       3Q      Max  
-2.2537  -0.1568  -0.0168   0.1543   1.3449  

Coefficients:
  Estimate Std. Error z value Pr(>|z|)   
(Intercept) 18.86630    7.44356   2.535  0.01126 * 
  wt          -8.08348    3.06868  -2.634  0.00843 **
  hp           0.03626    0.01773   2.044  0.04091 * 
  ---
  Signif. codes:  0  ***  0.001  **  0.01  *  0.05  .  0.1     1

(Dispersion parameter for binomial family taken to be 1)

Null deviance: 43.230  on 31  degrees of freedom
Residual deviance: 10.059  on 29  degrees of freedom
AIC: 16.059

Number of Fisher Scoring iterations: 8

#See how accurate the model is
num_correctly_classified = sum( round(predict(glogit,type="response")) == mtcars$am) 
num_correctly_classified / dim(mtcars)[1]
#Model has 0.9375 accuracy
#Coeffients are shaky one or two stars only

#Try same variables as multiple regression
glogit<-glm(formula = am~mpg+gear+qsec,data=mtcars,family = binomial,maxit=1000)
summary(glogit)
Call:
  glm(formula = am ~ mpg + gear + qsec, family = binomial, data = mtcars, 
      maxit = 1000)

Deviance Residuals: 
  Min          1Q      Median          3Q         Max  
-1.161e-05  -2.110e-08  -2.110e-08   2.110e-08   1.485e-05  

Coefficients:
  Estimate Std. Error z value Pr(>|z|)
(Intercept)     754.70 1943487.92   0.000        1
mpg              36.27   67437.77   0.001        1
gear            141.55  319472.96   0.000        1
qsec           -111.52  209171.18  -0.001        1

(Dispersion parameter for binomial family taken to be 1)

Null deviance: 4.3230e+01  on 31  degrees of freedom
Residual deviance: 4.2293e-10  on 28  degrees of freedom
AIC: 8

Number of Fisher Scoring iterations: 28

#See how accurate the model is
num_correctly_classified = sum( round(predict(glogit,type="response")) == mtcars$am) 
num_correctly_classified / dim(mtcars)[1]
#Models has 1.0 accuracy
#But coeffients are shaky. Pr(>|z|)=1 is due to perfect division of data. Need to try with new data