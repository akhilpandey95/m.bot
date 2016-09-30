## Notes for Machine Learning with Js
By
Akhil Pandey

The whole concept of machine learning is broadly categorized into two
namely :
- supervised learning
- unsupervised learning

### 1. Supervised learning :
Supervised learning is a learning that essentially has some information
while the process starts, so there is something called training data which
helps you to understand things based out of data that has been taught to you.
Fundamentally you are taught to recognize things and perform operations as
they come. There are some fundamental concepts in supervised learning:
- 1.1 `generalization`
- 1.2 `classification`
- 1.3 `features`
- 1.4 `k nearest neighbour`
- 1.5 `kNN algorithm`

#### 1.1 Generalization :
So when we apply the concept of supervised learning the most important
aspect after grabbing training data is "generalization". This basically
helps us to recognize things in a much easier way. It is important to
note that generalization is a tricky concept since over generalization
and under generalization can prove to give us errors. For example if
we want to generalize apple we might say that "It is round, it is red,
it is waxy", this can be considered as an example for generalization
that aptly suits for identifying apples.

#### 1.2 Classification :
In supervised learning most of the problems that arise are mainly based
on classification. As the name suggests classification is nothing but
having a task being solved by classifying or categorizing it into separate
classes.

#### 1.3 Features :
Features are nothing but aspects which we consider while breaking down an
object that has been given to us. For suppose if we are to find out whether
a given fruit is apple or not then features like "shape, colour, size etc"
help us in determining the result. In machine learning features are very
much needed for solving complex problems.

#### 1.4 K nearest neighbour :
Usually referred to as "kNN" is a supervised ML algorithm that is helpful
in identifying the nearest neighbour of the given mystery point K. So to
understand in a better way, let us simplify things. So let us say we are
given a problem where we are to identify whether the given space is a flat,
apartment or dwelling. So we are given some training data where we know
how much area, rooms make a particular space into a flat, apartment and
dwelling. On applying kNN we might identify whether a given space is flat,
apartment or dwelling. To better understand let us assume that the mystery
point or the one which is to be identified is "k". Now if "k" has two flats
and one apartment near to it, then k becomes a flat. This means that our
training data helps us in determining the attribute of our mystery point.

#### 1.5 kNN algorithm :
Procedure to implement the algorithm :
- measure the distances between the mystery point and other points
- pick a number, usually three is good for small data sets
- figure out the three closest points to the mystery point
- the majority of the three closest points is the answer

### 2. Unsupervised learning :
Unsupervised learning is a learning that essentially has no additional
information while the process starts, so it is something similar to data
mining.
