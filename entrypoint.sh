#!/bin/sh
redis-server --appendonly yes &
sysctl vm.overcommit_memory=1
wait
