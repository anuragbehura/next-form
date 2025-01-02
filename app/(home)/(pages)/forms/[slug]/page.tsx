import { GetFormBySlug, GetFormWithSubmissions} from '@/actions/form';
import VisitBtn from '@/components/VisitBtn';
import FormLinkShare from '@/components/FormLinkShare';
import React, { ReactNode } from 'react';
import { StatsCard } from "../../dashboard/page";
import { FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ElementsType, FormElementInstance } from '@/components/FormElements';
import { format, formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

type tParams = Promise<{ slug: string }>;
async function FormPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const form = await GetFormBySlug(slug);

  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;

  // Calculate submission and bounce rates
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex flex-col w-full">
          {/* Header Section */}
          <div className="border-b border-muted">
            <div className="container mx-auto px-10 py-10">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold truncate flex-1 mr-4">{form.name}</h1>
                <div className="flex-shrink-0">
                  <VisitBtn shareUrl={form.shareURL} />
                </div>
              </div>
            </div>
          </div>

          {/* Share URL Section */}
          <div className="border-b border-muted bg-muted/5">
            <div className="container mx-auto px-10 py-4">
              <FormLinkShare shareUrl={form.shareURL} />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total visits"
                icon={<LuView className="text-blue-600" />}
                helperText="All time form visits"
                value={visits.toLocaleString() || ""}
                loading={false}
                className="shadow-md shadow-blue-600"
              />
              <StatsCard
                title="Total submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="All time form submissions"
                value={submissions.toLocaleString() || ""}
                loading={false}
                className="shadow-md shadow-yellow-600"
              />
              <StatsCard
                title="Submission rate"
                icon={<HiCursorClick className="text-green-600" />}
                helperText="Visits that result in form submission"
                value={submissionRate.toLocaleString() + "%" || ""}
                loading={false}
                className="shadow-md shadow-green-600"
              />
              <StatsCard
                title="Bounce rate"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="Visits that leaves without interacting"
                value={bounceRate.toLocaleString() + "%" || ""}
                loading={false}
                className="shadow-md shadow-red-600"
              />
            </div>
      <div className="container pt-10">
        <SubmissionTable id={form._id} />
      </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionTable({id}: {id: string}) {
  const form = await GetFormWithSubmissions(id); 

  if(!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType
  }[] = [];

  formElements.forEach((element) => {
    switch(element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label as string,
          required: element.extraAttributes?.required as boolean,
          type: element.type,
        });
        break;
        default:
          break;
    }
  });

  interface FormSubmission {
    content: string; // JSON string representing the form submission content
    createdAt: string; // or Date, depending on your schema
    // Add other properties if necessary
  }
  
  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission: FormSubmission) => {
    const content = JSON.parse(submission.content);
    console.log("content", form.FormSubmissions);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">Submitted at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                      <RowCell 
                        key={column.id}
                        type={column.type}
                        value={row[column.id]}
                      />
                    ))}
                    <TableCell className="text-muted-foreground text-right">
                      {formatDistance(row.submittedAt, new Date(), {
                        addSuffix: true,
                      })}
                    </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function RowCell({type, value}: {
  type: ElementsType;
  value: string
}) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if(!value) break;
      const date = new Date(value);
      node = <Badge variant={"outline"}>
        {format(date, "dd/MM/yyyy")}
      </Badge>;
      break;
      case "CheckboxField":
        const checked = value === "true" ? true : false;
        node = <Checkbox checked={checked} disabled />
        break;
        default:
          break;
  }

  return(
    <TableCell>{node}</TableCell>
  )
}

