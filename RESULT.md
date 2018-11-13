# Benchmarking Results

### Lab 2
Measurement                         | Value 
---                                 | --- 
*Concurrency Level*                 |  25
*Requests per second*               |  115.13 [#/sec] (mean)  
*Time per request*                  |  217.146 [ms] (mean)
*99th percentile time per request*  |  572 [ms]
*CPU*                               |  ~8%
*Memory*                            |  107/992MB
*Disk*                              |  0 read, 0 write
*Network*                           |  ~50k recv, ~340k send

### Lab 3
Measurement                         | Value 
---                                 | --- 
*Concurrency Level*                 |  25
*Requests per second*               |  85.66 [#/sec] (mean)  
*Time per request*                  |  291.863 [ms] (mean)
*99th percentile time per request*  |  1229 [ms]
*CPU*                               |  ~42%
*Memory*                            |  97/992MB
*Disk*                              |  0 read, 0 write
*Network*                           |  ~50k recv, ~150k send

Requests were generally longer, as requests were testing the submit POST request this time. CPU usage was much higher, 
most likely due to overhead from sqlite. There is likely some problem in either our testing or code, as disk usage
remained at 0. Network receive usage was about the same, but send usage was reduced. Less data was likely being sent
in this lab (due to pagination).

