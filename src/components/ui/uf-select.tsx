'use client'

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { stateBrazil } from '@/lib/utils/state-brazil';
import Image from 'next/image';

const UfSelect = ({ initialUF }: { initialUF?: string }) => {

  const [search, setSearch] = React.useState('');
  const [selectedUF, setSelectedUF] = React.useState<string | undefined>(initialUF);

  React.useEffect(() => {
    if (initialUF) {
      setSelectedUF(initialUF);
    }
  }, [initialUF]);

  const filteredEstados = stateBrazil.filter((estado) =>
    estado.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleValueChange = (value: string) => {
    setSelectedUF(value);
  };

  const selectedState = stateBrazil.find((estado) => estado.value === selectedUF);

  return (
    <SelectPrimitive.Root value={selectedUF} onValueChange={handleValueChange}>
      <SelectPrimitive.Trigger className="flex items-center justify-between w-full border rounded-md p-2 text-left text-sm text-gray-500">
        <SelectPrimitive.Value>
          {selectedState ? (
            <div className="flex items-center">
              <Image
                src={selectedState.flag}
                alt={selectedState.label}
                width={24}
                height={16}
                className="mr-2"
                style={{ width: 'auto', height: '24px', maxWidth: '100%' }}
              />
              {selectedState.label}
            </div>
          ) : (
            'Selecione um estado...'
          )}
        </SelectPrimitive.Value>
        <ChevronDown className="ml-2" />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content
        side="bottom"
        align="start"
        sideOffset={50}
        style={{ zIndex: 9999 }}
      >
        <SelectPrimitive.ScrollUpButton />
        <SelectPrimitive.Viewport
          style={{ maxHeight: '300px', overflowY: 'auto' }}
          className="border rounded-md shadow-md bg-white p-2">
          {/* Campo de busca */}
          <input
            type="text"
            placeholder="Buscar estado..."
            className="w-full p-2 mb-2 border rounded-md text-sm text-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredEstados.length === 0 && (
            <div className="text-center p-2 text-sm text-gray-500">Nenhum estado encontrado.</div>
          )}

          {/* Lista de estados filtrados */}
          {filteredEstados.map((estado) => (
            <SelectPrimitive.Item
              key={estado.value}
              value={estado.value}
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-md"
            >
              <SelectPrimitive.ItemText>
                <div className='flex items-center'>
                  <Image
                    src={estado.flag}
                    alt={estado.label}
                    width={24}
                    height={16}
                    className="mr-2"
                    style={{ width: 'auto', height: '24px', maxWidth: '100%' }}
                  />
                  {estado.label}
                </div>
              </SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator>
                <Check className="w-4 h-4" />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>

          ))}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default UfSelect;