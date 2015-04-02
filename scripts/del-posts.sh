#!/bin/bash
for id in $@; do wp post delete $id --force --url=digitalpedagogy.commons.mla.org; done
