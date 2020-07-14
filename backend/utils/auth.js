
const jwt = require('jsonwebtoken');

const privateKEY = `-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: DES-EDE3-CBC,957DA6C7C6DA851C

P4MjHQ0Lys/EtzSpt6xR6iqn/afMDFL+JCQR+lcyv4Vhx86SHJye4sBUDcc8+1Ct
Y8JA5aPqKZQt08JpedX9+AabFBrh6RyzRlLcepvnZnRo2B7xj1R892QdPMLp9Au6
c+y4zt9UxYQAmXIZh1Ih5ygtAmOoAoGkViRKpST9JV1BVxlBEBAMn1ETrVzFEZUI
prKbBgfT/HHJVLZKuDCMNnFB03LJ8h21hDQcvuqm2QCG+kQGoIzA+D/b+Z5H1905
CR9dVW6Y5zrc1975UVWFGlylMu96RUQCFUQjsBrqdA4wE3IligZQwwzOig9/8sHq
mbRHNP78bpTaN5hmeVTaY60OpSZ/uSU4Yb1+M1bSj81h9B3sXfkFkNhGY45z0DR7
0K4whZr5aikyvj7a1xfZ7PGC0zgF0SeLgqMHOIddTt69lu3Xjj330cowVujfj9rd
UDtO6uTeDmzYIVziFj1MJuf9bDhj92A+QGSptJ+cs85imuaImfxy20nSJM6D83Ss
50ZlsiSYHXz0RjOv0kwhaT9xAyL1zIrU88IXpitPqyi8vPUohRnAJfybZbyf4LDW
EKdWi5bwgVw71vQzmQTr+ggA/DvpK7vm6kS2kLBGNp1iBJVE6moeedLAUW1Uk/K7
J3M734000Wgd8zgBZSlFj2OwAUlxfhIIoPguZZmKBzyrhxRfjqGBBR5FrAlM3Ucw
5QkhrC4Tt7YkxRrtJZiAKpHiCmqfRC90YTnIfKqqXwaTj5Uhs0ixwuEV7ZPyDx+6
MVh9IygquzA9SaWmhgntQDfQx0gNi3dSDpdMROqNlRFJyHs+74uuhq9PsCntIpZq
9kbT+m+Yv2lgSkZNUvf1uNrPX9mb8+XvlFMVSOU6jcz7WHb/KqpUXTV5z04k91Ag
cShJVkT1yFnL9rgrGPFHjrhhlOZk5AnQrogeUAtCDmn56gxfxhidWiGDx6CTKxir
b8AP26Ba3MG7d3UqYVmtC3RN3TWt/4fJkhtS5D3CDzpD+8CpS9AQP+R94WJ/BdYG
TJF2oMytUD4NbJTmA0zZfph0m7avRW7oyT63V7jQO3OuWgaybuyTIDHsJoHJrD4p
UN+xgQnkqjfu+3M95WmmSIIv43lirWZmHnlhP7mivhzIXiDcSKqkZOj4M4XvL0JQ
G7lp4P/gSetfdu8CEPRe3W3JknQ7Th7NVWRgmXLN9c2JrCnc5js38OsPQBvETMPl
lroXO9jbEOoT3Ti+9in6EPUZ9/A0aWajRwDClK0NepEm6S2uLRXZ7o8Hu7+kB3fd
Z4MX+j4H948WBnCUKm7is9NsFZbzcM191u3yppZt/Yir6KCWLXHXIXGj/Lbl9GPx
oOWCpn604n1x85x5oeKmpVaQMX1HrwDcjA/4n0nt3jW04hX9lsN8sLrVnO0+PIJU
nVKmW/JrRwhwhuGYjSMyMlG9G/yq4lgPkoF9cu6ztH2qftHhgnzL6k+auSoSV9G2
5URQc0akhA05H9nCeujnau8ds1Xt7EwrLpZjKOhddjgcpuPUyjSRnczjNNhlYrrL
ohnuUV6d84yALwu7U82epzzXxFEiyKxI9mjCsFS1/dbqr4ZmhOQkERSJf3Bgtu+b
-----END RSA PRIVATE KEY-----
`;
const privateKeyPassphrase = 'horace';
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwudSprTvQMi7IEQ30ozW
Cln+40ww9+EcPMHWkuqKE2ivG8vQAydSTWtGU2XWsNB8lufJBhctoTDGB2dyPfnR
dsgNwEsct96sa5dy0VK7yhW+SXNa+nlVYu92E4d1RIUgQCdUIRUFxd9ODXQXTvnz
F+6M5UNlbbBlDBqC1FlI7fQfoWIwNK16FcnmLB2ziRBt5pQ6nY2Vzwi/fdeuhEEk
t90qmAI4YoVC1YZa+JiLAoUteYQeBUGnlqkOOpbWMLUM+VScbiJo6Dm5649U4Y5p
5YR8i7yJ9K++xKGLDI3hWkCPyFo3p93opoe3cHehkOh4Fr2rwInZPll/hPhXUF0u
iwIDAQAB
-----END PUBLIC KEY-----`;
const sign = (user)=>{
    return jwt.sign(user, { key:privateKEY, passphrase:privateKeyPassphrase }, {expiresIn: '2d', algorithm: 'RS256'}, )
    //return jwt.sign(user, privateKEY, {expiresIn: '2d'})
}

module.exports={
    sign,
    publicKey,
}