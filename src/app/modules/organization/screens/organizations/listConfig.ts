export const listConfig = {
    columns: [
        {
          field: 'name',
          header: 'Organization Name',
          pipe: 'titleCase',
          type: 'navigate',
        },
        { field: 'code', header: 'Code', pipe: 'null', type: 'navigate' },
        {
          field: 'contactEmail',
          header: 'Contact Email',
          pipe: 'null',
          type: 'navigate',
        },
        {
          field: 'organizationType',
          header: 'Organization Type',
          pipe: 'null',
          type: 'navigate',
        },
    
        {
          header: 'Actions',
          type: 'actions',
          actions: [
            {
              type: 'edit',
              text: 'Edit',
              icon: 'pi pi-pencil',
            },
            {
              type: 'delete',
              text: 'Delete',
              icon: 'pi pi-trash',
            },
          ],
        },
      ],
}

export interface organizationList {
    id: number,
    name: string,
    code: string,
    contactEmail: string,
    organizationType: number | string
}