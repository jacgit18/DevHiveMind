Safer for real world
``` mermaid
flowchart LR
	Closed[Closed Full Guard] 
    A[Full Guard] 
    B[De La Riva] 
    C[Spider]
    D[Butterfly]
    E[Lasso Guard]
	G[Collar/Sleeve]
	H[Half Guard] 
	I[Side Control] 
	J[Mount] 
	K[North/South] 
	L[Reverse DeLaRiva] 
	M[Berimbolo]
	N[50/50]
	Q[Rubber]
	R[Mission Control]
	Z[ZGuard]

	1[Triangle]
	2[Gogoplata]
	3[Omoplata]
	4[Armbar]

	Closed <-.-> A
    A <-.-> B
    A <-.-> C
    A <-.-> D
    A <-.-> E
    A <-.-> H
    A <-.-> Q
    A <-.-> R
    B <-.-> C

    B --> G
    B <-.-> L
    B --> M
    B --> N

    B --> R
    C --> D
    C --> E
    C --> G

	D --> N
	D --> Q
	D --> R

	H <-.-> I
	H <-.-> Q 
	H --> R
	H <-.-> Z
	I <-.-> J
	J --> N
	L <-.-> C

	I <-.-> K
	R <-.-> Q 
	R --> 1
	R --> 2
	R --> 3 
	R --> 4 

style Closed fill:teal,stroke:black,stroke-width:4px,shadow:shadow

style A fill:green,stroke:black,stroke-width:4px,shadow:shadow

style B fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style C fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style D fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style E fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style G fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style H fill:green,stroke:black,stroke-width:4px,shadow:shadow

style I fill:green,stroke:black,stroke-width:4px,shadow:shadow

style J fill:green,stroke:black,stroke-width:4px,shadow:shadow

style K fill:green,stroke:black,stroke-width:4px,shadow:shadow

style L fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style M fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style N fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style Q fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style R fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style Z fill:blue,stroke:black,stroke-width:4px,shadow:shadow


style 1 fill:red,stroke:black,stroke-width:4px,shadow:shadow

style 2 fill:red,stroke:black,stroke-width:4px,shadow:shadow

style 3 fill:orange,stroke:black,stroke-width:4px,shadow:shadow

style 4 fill:orange,stroke:black,stroke-width:4px,shadow:shadow
```

Sweeps
``` mermaid
flowchart LR
    Closed[Closed Full Guard] 
    A[Full Guard] 
    B[De La Riva] 
    C[Spider]
    D[Butterfly]
    E[Lasso Guard]
    F[X]
	G[Collar/Sleeve]
	H[Half Guard] 
	I[Side Control] 
	J[Mount] 
	K[North/South] 
	L[Reverse DeLaRiva] 
	M[Berimbolo]
	N[50/50]
	O[Worm]
	P[Tornado]

	1[test]

    A <-.-> B
    A <-.-> C
    A <-.-> D
    A <-.-> E
    A <-.-> H
    B <-.-> C
    B --> F
    B --> G
    B <-.-> L
    B --> M
    B --> O
    C --> D
    C --> E
    C --> G
	D --> F
	F --> N
	H <-.-> I
	H --> P
	I <-.-> J
	L <-.-> C
	L --> F
	I <-.-> K

    1 <-.-> A

style A fill:green,stroke:black,stroke-width:4px,shadow:shadow

style B fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style C fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style D fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style E fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style G fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style H fill:green,stroke:black,stroke-width:4px,shadow:shadow

style I fill:green,stroke:black,stroke-width:4px,shadow:shadow

style J fill:green,stroke:black,stroke-width:4px,shadow:shadow

style K fill:green,stroke:black,stroke-width:4px,shadow:shadow

style L fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style M fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style N fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style O fill:blue,stroke:black,stroke-width:4px,shadow:shadow

style P fill:blue,stroke:black,stroke-width:4px,shadow:shadow
```
