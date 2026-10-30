export interface CodeSnippet {
  language: string;
  filename: string;
  lines: { text: string; indent: number }[];
}

export const codeSnippets: CodeSnippet[] = [
  {
    language: 'TypeScript',
    filename: 'useWorkflow.tsx',
    lines: [
      { text: 'import { useState, useCallback } from "react";', indent: 0 },
      { text: '', indent: 0 },
      { text: 'export function useWorkflow<T>(', indent: 0 },
      { text: 'initial: T,', indent: 1 },
      { text: 'validate: (val: T) => boolean', indent: 1 },
      { text: ') {', indent: 0 },
      { text: 'const [state, setState] = useState<T>(initial);', indent: 1 },
      { text: '', indent: 0 },
      { text: 'const update = useCallback((next: T) => {', indent: 1 },
      { text: 'if (validate(next)) setState(next);', indent: 2 },
      { text: '}, [validate]);', indent: 1 },
      { text: '', indent: 0 },
      { text: 'return { state, update };', indent: 1 },
      { text: '}', indent: 0 },
    ],
  },
  {
    language: 'C#',
    filename: 'InventoryService.cs',
    lines: [
      { text: 'public class InventoryService', indent: 0 },
      { text: '{', indent: 0 },
      { text: 'private readonly IInventoryRepo _repo;', indent: 1 },
      { text: '', indent: 0 },
      { text: 'public InventoryService(IInventoryRepo repo)', indent: 1 },
      { text: '{', indent: 1 },
      { text: '_repo = repo;', indent: 2 },
      { text: '}', indent: 1 },
      { text: '', indent: 0 },
      { text: 'public async Task<Item> GetById(int id)', indent: 1 },
      { text: '=> await _repo.GetByIdAsync(id);', indent: 1 },
      { text: '}', indent: 0 },
    ],
  },
  {
    language: 'React',
    filename: 'CampaignCard.tsx',
    lines: [
      { text: 'export const CampaignCard = ({', indent: 0 },
      { text: 'title, status, metric', indent: 1 },
      { text: '}: CampaignProps) => (', indent: 0 },
      { text: '<article className="card">', indent: 1 },
      { text: '<header className="flex">', indent: 2 },
      { text: '<h3>{title}</h3>', indent: 3 },
      { text: '<Badge status={status} />', indent: 3 },
      { text: '</header>', indent: 2 },
      { text: '<Metric value={metric} />', indent: 2 },
      { text: '</article>', indent: 1 },
      { text: ');', indent: 0 },
    ],
  },
  {
    language: '.NET',
    filename: 'Startup.cs',
    lines: [
      { text: 'public void ConfigureServices(', indent: 0 },
      { text: 'IServiceCollection services)', indent: 1 },
      { text: '{', indent: 0 },
      { text: 'services.AddControllers();', indent: 1 },
      { text: 'services.AddDbContext<DbContext>();', indent: 1 },
      { text: 'services.AddScoped<IApi, ApiGateway>();', indent: 1 },
      { text: '', indent: 0 },
      { text: 'services.AddCors(opt =>', indent: 1 },
      { text: 'opt.AddPolicy("default",', indent: 2 },
      { text: 'b => b.AllowAnyOrigin()));', indent: 2 },
      { text: '}', indent: 0 },
    ],
  },
];
