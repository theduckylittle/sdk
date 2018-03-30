#!/bin/bash

#
# Finds missing documentation.
#

find ../src/ -name "*.js" -exec ./doc_checker.js {} \;
