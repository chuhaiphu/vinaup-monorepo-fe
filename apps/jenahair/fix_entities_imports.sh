#!/bin/bash
cd /Users/doanvinhphu/Documents/Work/VinaUp/vinaup-monorepo/apps/jenahair

for FILE in $(grep -rl "from '@/components/tables/entities-table/entities-table'" src/); do
    sed -i '' "s|from '@/components/tables/entities-table/entities-table'|from '@vinaup/ui/admin'|g" $FILE
done

for FILE in $(grep -rl "from '@/components/tables/entities-table/_props'" src/); do
    sed -i '' "s|from '@/components/tables/entities-table/_props'|from '@vinaup/ui/admin'|g" $FILE
done

