### tag assignment
> bug
- not showing the contact if there are many number, which the user might search with mobile and the result is the businessTel, see if it's display correctly
- excel data only the top 100 records on the excel customer array from the payload
- used wrong group and center code to search

> tailwind style
- instruction style not consist
- `badge color` not showing correctly as missing the css style on the `main.tsx`



Customer Plan
Customer Info
and the group name and center/org name


	host = "cdss3-uat-postgresql.postgres.database.azure.com"
		user = "pdadmin"
		password = "ctintP@ssword1"
		dbname = "cdss3_core_qhms_phase2"


PGPASSWORD='ctintP@ssword1' psql -h cdss3-uat-postgresql.postgres.database.azure.com -p 5432 -U pdadmin -d cdss3_core_qhms_phase2 -c "
  SET search_path TO qhms;
  COPY (
    SELECT
      c.\"lastNameEnglish\" AS \"Last Name\",
      c.\"firstNameEnglish\" AS \"First Name\",
      grp.description AS \"Group Name\",
      center.description AS \"Center/Org Name\",
      c.\"telMobile\" AS \"Mobile Number\"
    FROM customer c
    INNER JOIN customer_plan cp ON c.id = cp.\"customerId\"
    LEFT JOIN dropdown grp ON cp.\"groupCode\" = grp.code AND grp.type = 'Group' AND grp.active = 'Y'
    LEFT JOIN dropdown center ON cp.\"centerOrgCode\" = center.code AND center.type = 'CenterOrg' AND center.active = 'Y'
    LIMIT 1000
  ) TO STDOUT WITH CSV HEADER;
  " > customer_export_1000.csv